const fs = require('fs');

function convert(src, dst) {
    const obj = fs.readFileSync(src, { encoding: 'utf8' });

    const vertexMatches = obj.match(/^v( -?\d+(\.\d+)?){3}$/gm);
    const vertices = vertexMatches.map(vertex => {
        const verts = vertex.split(' ');
        verts.shift();
        return verts.map(e => Number.parseFloat(e));
    });

    const faceMatches = obj.match(/^f( \d+\/\/\d+?){3}$/gm);
    const faces = faceMatches.map(face => {
        const faces2 = face.split(/(?:\s|\/\/)/gm);
        faces2.shift();
        return faces2.map(e => Number.parseInt(e, 10));
    });

    const result = [];
    for (const face of faces) {
        const id0 = face[0] - 1;
        const id1 = face[2] - 1;
        const id2 = face[4] - 1;

        result.push({
            a: { x: vertices[id0][0], y: vertices[id0][1], z: vertices[id0][2] },
            b: { x: vertices[id1][0], y: vertices[id1][1], z: vertices[id1][2] },
            c: { x: vertices[id2][0], y: vertices[id2][1], z: vertices[id2][2] }
        });
    }

    fs.writeFileSync('./test.json', JSON.stringify(result, null, '\t'));
}

convert('./test.obj', './test.json');
