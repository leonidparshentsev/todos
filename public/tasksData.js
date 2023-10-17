const tasksData = [ {
    id: 1,
    projectTitle: 'Learn Javascript',
    groups: [
        {   
            id: 1,
            groupTitle: 'Todo',
            tasks: [{ id: 1, taskTitle: 'Learn react' }, { id: 2, taskTitle: 'Learn react hooks' }, { id: 3, taskTitle: 'Make pet-projects' }]
        },
        {
            id: 2,
            groupTitle: 'Doing',
            tasks: [{ id: 1, taskTitle: 'First task doing' }, { id: 2, taskTitle: 'Second task doing' }, { id: 3, taskTitle: 'Theird task doing' }]
        },
        {
            id: 3,
            groupTitle: 'Done',
            tasks: [{ id: 1, taskTitle: 'Understand async/await' }, { id: 2, taskTitle: 'Make some projects with vanila JS' }, { id: 3, taskTitle: 'Learn base syntax' }]
        }
    ],
}, {
    id: 2,
    projectTitle: 'Learn Typescript',
    groups: [
        {   
            id: 1,
            groupTitle: 'Todo',
            tasks: [{ id: 1, taskTitle: 'Learn base syntax' }, { id: 2, taskTitle: 'Learn generics' }, { id: 3, taskTitle: 'Rewrite some project to typescript' }, { id: 4, taskTitle: 'Make ts project from 0' }]
        },
        {
            id: 2,
            groupTitle: 'Doing',
            tasks: []
        },
        {
            id: 3,
            groupTitle: 'Done',
            tasks: []
        }
    ],
}   
];

export default tasksData;