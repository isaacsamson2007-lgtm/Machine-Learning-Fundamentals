const { spawn } = require('child_process');
const path = require('path');

const PYTHON_BIN = process.env.PYTHON_PATH || 'python';
const PYTHON_DIR = path.join(__dirname, '..', 'python');

function runPythonScript(scriptName, inputData) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(PYTHON_DIR, scriptName);
    const jsonInput = JSON.stringify(inputData);

    const pyProcess = spawn(PYTHON_BIN, [scriptPath], {
      cwd: PYTHON_DIR,
      windowsHide: true,
    });

    let stdoutData = '';
    let stderrData = '';

    pyProcess.stdout.on('data', (chunk) => {
      stdoutData += chunk.toString();
    });

    pyProcess.stderr.on('data', (chunk) => {
      stderrData += chunk.toString();
    });

    pyProcess.on('error', (err) => {
      reject(new Error(`Failed to spawn Python process (${PYTHON_BIN}): ${err.message}`));
    });

    pyProcess.on('close', (code) => {
      if (stderrData && process.env.NODE_ENV !== 'production') {
        console.warn(`[${scriptName} stderr]:`, stderrData.trim());
      }

      if (code !== 0 && !stdoutData.trim()) {
        return reject(new Error(`Python process exited with code ${code}. Error: ${stderrData.trim()}`));
      }

      try {
        const parsed = JSON.parse(stdoutData.trim());
        if (parsed.success === false && parsed.error) {
          return reject(new Error(parsed.error));
        }
        resolve(parsed);
      } catch (err) {
        reject(new Error(`Failed to parse JSON output from ${scriptName}: ${stdoutData} (Raw stderr: ${stderrData})`));
      }
    });

    // Write input JSON to stdin and end stream
    pyProcess.stdin.write(jsonInput);
    pyProcess.stdin.end();
  });
}

function calculateConsensus(logRes, dtRes, rfRes) {
  const votes = {
    Low: 0,
    Moderate: 0,
    High: 0,
    Severe: 0
  };

  const weights = {
    logistic: 0.25,
    decisionTree: 0.35,
    randomForest: 0.40
  };

  // Tally weighted votes
  if (logRes.congestionLevel && votes[logRes.congestionLevel] !== undefined) {
    votes[logRes.congestionLevel] += weights.logistic * (logRes.confidence / 100);
  }
  if (dtRes.congestionLevel && votes[dtRes.congestionLevel] !== undefined) {
    votes[dtRes.congestionLevel] += weights.decisionTree * (dtRes.confidence / 100);
  }
  if (rfRes.congestionLevel && votes[rfRes.congestionLevel] !== undefined) {
    votes[rfRes.congestionLevel] += weights.randomForest * (rfRes.confidence / 100);
  }

  let finalLevel = 'Moderate';
  let maxScore = -1;
  for (const [level, score] of Object.entries(votes)) {
    if (score > maxScore) {
      maxScore = score;
      finalLevel = level;
    }
  }

  // Calculate consensus confidence average across classifiers predicting that level or max confidence
  const confidences = [
    logRes.congestionLevel === finalLevel ? logRes.confidence : (100 - logRes.confidence),
    dtRes.congestionLevel === finalLevel ? dtRes.confidence : (100 - dtRes.confidence),
    rfRes.confidence
  ].filter(c => typeof c === 'number' && !isNaN(c));

  const avgConfidence = confidences.length
    ? Math.round((confidences.reduce((a, b) => a + b, 0) / confidences.length) * 10) / 10
    : 92.0;

  const actions = {
    Low: [
      'Traffic conditions are normal',
      'Continue standard monitoring',
      'Maintain regular signal intervals',
      'Log routine green corridor metrics'
    ],
    Moderate: [
      'Optimize traffic signals dynamically',
      'Monitor congestion growth trends',
      'Prepare secondary diversion avenues',
      'Adjust green light duration on main corridors'
    ],
    High: [
      'Optimize signal timing immediately',
      'Increase active traffic camera monitoring',
      'Recommend alternate routes via Smart City display boards',
      'Monitor and restrict heavy vehicle movement'
    ],
    Severe: [
      'Activate emergency traffic control protocols',
      'Increase signal priority for congested arteries',
      'Deploy traffic personnel to critical intersections',
      'Recommend immediate alternate routes on navigation feeds'
    ]
  };

  return {
    level: finalLevel,
    confidence: avgConfidence,
    recommendations: actions[finalLevel] || actions.Moderate
  };
}

async function runAllPredictions(trafficData) {
  const [linearRes, logisticRes, dtRes, rfRes] = await Promise.all([
    runPythonScript('linear_predict.py', trafficData),
    runPythonScript('logistic_predict.py', trafficData),
    runPythonScript('decision_tree_predict.py', trafficData),
    runPythonScript('random_forest_predict.py', trafficData),
  ]);

  const consensus = calculateConsensus(logisticRes, dtRes, rfRes);

  return {
    success: true,
    linearRegression: linearRes,
    logisticRegression: logisticRes,
    decisionTree: dtRes,
    randomForest: rfRes,
    finalVerdict: consensus
  };
}

module.exports = {
  runPythonScript,
  runAllPredictions
};

