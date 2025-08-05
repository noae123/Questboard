export const asyncResponse = (res, milisecondes = 1000) => 
    new Promise((resolve) => {
        setTimeout(() => resolve(res), milisecondes);
    });

export const objectToCamelCase = (obj) => objectsToCase(obj, 'camelCase', 'objectToCamelCase');
export const objectToSnakeCase = (obj) => objectsToCase(obj, 'snakeCase', 'objectToSnakeCase');

const objectsToCase = (obj, caseType, name) => {
    if (!obj|| typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => objectsToCase(item, caseType, name));
    }

    const convertCase = caseType === 'camelCase' ? convertToCamelCase : convertToSnakeCase;

    const result = {};
    Object.keys(obj).forEach(key => {
        if (convertCase[key] !== key && convertCase[key] in result) {
            console.error(`'${name}': skipping key '${key}' key camel case conversion, key already exists in the object.`);
        }
        result[convertCase[key]] = objectsToCase(obj[key], caseType, name);
    });

    return result;
};

export const convertToCamelCase = (str) => {
    if (/[A-Z]|-/g.test(str)){
        return str;
    }

    return str.replace(/([_][a-z])/g, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
};

export const convertToSnakeCase = (str) => {
    if (/__|-/g.test(str)){
        return str;
    }

    return str.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);
}

let incrementalId = 0;
export const getIncrementalId = () => {
    incrementalId += 1;
    return incrementalId;
};
