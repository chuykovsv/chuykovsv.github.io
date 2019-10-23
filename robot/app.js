const robot = document.getElementById('app-robot');
const uiSteps = document.getElementById('app-steps');
const pos = { x: 4, y: 4 };
let start = false;

const steps = [];
let stepIt = 0;

robot.style.top = pos.y * 8 + 2 + 'vh';
robot.style.left = pos.x * 8 + 2 + 'vh';

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
            pos.x--;
            break;
        case 'right':
            pos.x++;
            break;
        case 'up':
            pos.y--;
            break;
        case 'down':
            pos.y++;
            break;
        default: break;
    }

    if (pos.x < 0) pos.x = 0;
    if (pos.x > 7) pos.x = 7;
    if (pos.y < 0) pos.y = 0;
    if (pos.y > 7) pos.y = 7;

    robot.style.top = pos.y * 8 + 2 + 'vh';
    robot.style.left = pos.x * 8 + 2 + 'vh';

    setTimeout(loop, 200);
}

function startFunc() {
    start = true;
    stepIt = 0;
    pos.x = 4;
    pos.y = 4;
    robot.style.top = pos.y * 8 + 2 + 'vh';
    robot.style.left = pos.x * 8 + 2 + 'vh';
    setTimeout(loop, 200);
}