array = [['1', '2'], ['2', '3'], ['3', '4']]

new_array = array.map(([source, target], index) => {
    return { data: { source: source, target: target, id: `${index + 1}` } }
})

console.log(new_array)