export const colorsList = {
    1: 'pink',
    2: 'brown',
    3: 'orange',
    4: 'gray',
    5: 'yellow',
    6: 'green',
    7: 'blue',
    8: 'purple',
    9: 'red',
};

export function colorStyle(groupColorId) {
    const style = {
        'container': { backgroundColor: `var(--${colorsList[groupColorId]}_main)` },
        'title' : { backgroundColor: `var(--${colorsList[groupColorId]}_secondary)`, 
                    color: `var(--${colorsList[groupColorId]}_text_dark)`},
        'taskCount' : { color: `var(--${colorsList[groupColorId]}_text_light)`},
        'svgPath' : { stroke: `var(--${colorsList[groupColorId]}_text_light)`},
        'button' : { color: `var(--${colorsList[groupColorId]}_text_light)`}
    }

    return style;
}

