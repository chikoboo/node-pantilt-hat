node-pantilt-hat
====

Pan-Tilt HAT for Node.js

## Install
```
npm install node-pantilt-hat
```

# Usage
```
import { NodePanTilt } from 'node-pantilt-hat';

const pantilt = new NodePanTilt();

pantilt.setPan(10); // -90 to 90
pantilt.setTilt(20); // -90 to 90

pantilt.getPan(); // 10
pantilt.getTilt(); // 20
```