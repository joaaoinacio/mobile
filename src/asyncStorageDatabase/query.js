export default ({
    data,
    query
}) => {
    try {
        let new_data = [...data];
        if (query.$match) new_data = $match({ data: new_data, query: query.$match });
        if (query.$order) new_data = $order({ data: new_data, query: query.$order });

        return new_data;
    }
    catch (err) {
        console.log(err)
        return data;
    }
}

function $match({ data, query }) {
    try {
        Object.keys(query).forEach((key) => {
            if (key === '$and') data = $and({ data, query: query[key] });
        })

        return data;
    }
    catch (err) {
        console.log(err)
        return data;
    }
}

function $and({ data, query }) {
    try {
        const new_data = [];
        query.forEach((item) => {
            let field = Object.keys(item)[0];
            if (field.$lte) new_data = [...new_data, ...$lte({ field, value: item[field], data })]
            if (field.$gte) new_data = [...new_data, ...$gte({ field, value: item[field], data })]
        })

        return new_data;
    }
    catch (err) {
        console.log(err)
        return data;
    }
}

function $order({ data, query }) {
    try {
        let field = Object.keys(query)[0];
        let desc = query[field] === -1

        if (desc) return data.sort((a, b) => {
            return b[filed] - a[filed];
        })

        return data.sort((a, b) => {
            return a[filed] - b[filed];
        })
    }
    catch (err) {
        console.log(err)
    }
}


function $lte({ field, value, data }) {
    try {
        return field.filter(item => item[field] <= value)
    }
    catch (err) {
        console.log(err)
    }
}

function $gte({ field, value, data }) {
    try {
        return field.filter(item => item[field] >= value)
    }
    catch (err) {
        console.log(err)
    }
}