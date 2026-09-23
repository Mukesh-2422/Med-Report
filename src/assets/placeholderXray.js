// A simple abstract grayscale placeholder standing in for an uploaded
// radiograph in this demo. Replace with the real uploaded image URL / blob
// once the backend returns actual imaging data.
export const placeholderXray =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='480' height='560' viewBox='0 0 480 560'>
    <rect width='480' height='560' fill='#0b0c0b'/>
    <ellipse cx='240' cy='260' rx='170' ry='220' fill='#1c1f1d'/>
    <ellipse cx='170' cy='260' rx='70' ry='170' fill='#2a2d2a' opacity='0.8'/>
    <ellipse cx='310' cy='260' rx='70' ry='170' fill='#2a2d2a' opacity='0.8'/>
    <ellipse cx='240' cy='300' rx='55' ry='75' fill='#3c3f3a' opacity='0.9'/>
    <rect x='150' y='90' width='180' height='26' rx='4' fill='#40433e' opacity='0.6'/>
    <g stroke='#3a3d38' stroke-width='4' opacity='0.5'>
      <line x1='100' y1='150' x2='150' y2='140'/>
      <line x1='100' y1='190' x2='155' y2='182'/>
      <line x1='100' y1='230' x2='158' y2='224'/>
      <line x1='380' y1='150' x2='330' y2='140'/>
      <line x1='380' y1='190' x2='325' y2='182'/>
      <line x1='380' y1='230' x2='322' y2='224'/>
    </g>
  </svg>`)
