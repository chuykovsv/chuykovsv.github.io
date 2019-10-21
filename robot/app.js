const robot = document.getElementById('app-robot');
const uiSteps = document.getElementById('app-steps');
const pos = { x: 256, y: 256 };
let start = false;

const steps = [];
let stepIt = 0;

robot.style.top = pos.y + 'px';
robot.style.left = pos.x + 'px';

document.getElementById('app-ui-start').addEventListener('click', startFunc);
document.getElementById('app-ui-left').addEventListener('click', () => {
    steps.push('left');
    const step = document.createElement('div');
    step.className = 'app-steps-step';
    step.innerHTML = 'LEFT';
    uiSteps.appendChild(step);
});
document.getElementById('app-ui-right').addEventListener('click', () => {
    steps.push('right');
    const step = document.createElement('div');
    step.className = 'app-steps-step';
    step.innerHTML = 'RIGHT';
    uiSteps.appendChild(step);
});
document.getElementById('app-ui-up').addEventListener('click', () => {
    steps.push('up');
    const step = document.createElement('div');
    step.className = 'app-steps-step';
    step.innerHTML = 'UP';
    uiSteps.appendChild(step);
});
document.getElementById('app-ui-down').addEventListener('click', () => {
    steps.push('down');
    const step = document.createElement('div');
    step.className = 'app-steps-step';
    step.innerHTML = 'DOWN';
    uiSteps.appendChild(step);
});

function loop() {
    if (!start) return;
    const step = steps[stepIt];
    stepIt++;
    if (!step) return;

    switch(step) {
        case 'left':
            pos.x -= 64;
            break;
        case 'right':
            pos.x += 64;
            break;
        case 'up':
            pos.y -= 64;
            break;
        case 'down':
            pos.y += 64;
            break;
        default: break;
    }

    if (pos.x < 0) pos.x = 0;
    if (pos.x > 448) pos.x = 448;
    if (pos.y < 0) pos.y = 0;
    if (pos.y > 448) pos.y = 448;

    robot.style.top = pos.y + 'px';
    robot.style.left = pos.x + 'px';

    setTimeout(loop, 400);
}

function startFunc() {
    start = true;
    stepIt = 0;
    pos.x = 256;
    pos.y = 256;
    robot.style.top = pos.y + 'px';
    robot.style.left = pos.x + 'px';
    setTimeout(loop, 400);
}