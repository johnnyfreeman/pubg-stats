export function get({ id, type }) {
    return this[type][id];
};

export function getAll(resources) {
    return resources.map(get.bind(this));
};

export function reducer(state, resource) {
    const { id, type } = resource;

    if (!state.hasOwnProperty(type)) state[type] = {};
    if (!state[type].hasOwnProperty(id)) state[type][id] = resource;

    return state;
};

export function denormalize(resource, maxDepth = 2, depth = 0) {
    let obj = { id: resource.id };
    depth++;

    Object.assign(obj, resource.attributes);

    if (resource.relationships && depth < maxDepth) {
        let relationships = Object.keys(resource.relationships);
        for (var i = 0; i < relationships.length; i++) {
            let key = relationships[i];
            if (resource.relationships[key].data) {
                if (Array.isArray(resource.relationships[key].data)) {
                    obj[key] = getAll.call(this, resource.relationships[key].data).map((resource) => {
                        return denormalize.call(this, resource, maxDepth, depth)
                    });
                } else {
                    let relatedResource = get.call(this, resource.relationships[key].data);
                    obj[key] = denormalize.call(this, relatedResource, maxDepth, depth);
                }
            }
        }
    }

    return obj;
};
