/**
 * 
 * Validates data for graph and returns list of errors, if any
 * 
 *  there must be at least one vertex
 *  all vertices must have an ID 
 *  edges sources and targets must exist as vertices 
 *
 */
export const getErrors = (data) => {
    const errors = [];

    // check if there are any nodes
    if (data.vertices === null) {
        errors.push('No vertices supplied');
    }

    // check vertices all have a valid ID
    data.vertices.forEach(v => {
        if (typeof v.id === 'undefined') {
            errors.push(`Missing a vertex ID - it must be an alphanumeric string`)
        } else if (v.id === null || v.id.trim() === '') {
            errors.push(`Missing a vertex ID - it must be an alphanumeric string`)
        }
    })

    // if there is an edge there needs to be more than one vertex
    if (data.edges?.length >= 1 && data.vertices?.length === 0) {
        errors.push('There needs to be more than one vertex for an edge');
    }

    // check edge sources and targets must exist as vertices
    const vertexIds = data.vertices.map(v => v.id)
    data.edges?.forEach(edge => {
        if (!vertexIds.some(id => edge.source_id === id)) {
            errors.push(`Vertex source ID ${edge.source_id} doesn't exist`)
        } else if (!vertexIds.some(id => edge.target_id === id)) {
            errors.push(`Vertex target ID ${edge.target_id} doesn't exist`)
        }
    });

    return errors;
}

/**
 *
 * Returns data in format suitable for d3 graph
 * 
 */
export const mapData = (data) => {
    const vertexToIndexMap = {};
    data.vertices?.forEach((v, index) => {
        vertexToIndexMap[v.id.trim()] = index;
    });

    const mappedData = {
        ...data,
        vertices: data.vertices?.map((v, index) => ({
            id: index,
            label: v.label,
            type: v.type
        })),
        edges: data.edges?.map((e, index) => {
            return {
                id: index,
                label: e.label,
                type: e.type,
                source: vertexToIndexMap[e.source_id.trim()],
                target: vertexToIndexMap[e.target_id.trim()]
            }
        }),
    }

    return mappedData;
};