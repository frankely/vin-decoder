
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



# Vehicle Identification Number Decoder
VIN Decoder

## API

### Validate VIN

```javascript
const isValid = validate('1NXBR32E77Z923602') // true
```
### Validate VIN with special checksum as parameter

```javascript
const isValid = validate('1HVLNHGN9FHA63345', 8) // true
```

### Split Identification Number

**Year Code**
```javascript
const year = split('1NXBR32E77Z923602').year // 7
```

**Security Code**
```javascript
const securityCode = split('1NXBR32E77Z923602').securityCode // 7
```

**Assembly Plant**
```javascript
const assemblyPlant = split('1NXBR32E77Z923602').assemblyPlant // Z
```

**Made In**
```javascript
const madeIn = split('1NXBR32E77Z923602').madeIn // 1N
```

**Manufacturer**
```javascript
const manufacturer = split('1NXBR32E77Z923602').manufacturer // 1NX
```

**Details**
```javascript
const details = split('1NXBR32E77Z923602').details // BR32E
```

**Serial Number**
```javascript
const serialNumber = split('1NXBR32E77Z923602').serialNumber //923602
```

### Decode Identification Number

**Country**
```javascript
const country = decode('1NXBR32E77Z923602').country // United States
```

**Serial Number**
```javascript
const serialNumber = decode('1NXBR32E77Z923602').serialNumber // 923602
```

**Manufacturer**
```javascript
const serialNumber = decode('1NXBR32E77Z923602').manufacturer // NUMMI USA
```