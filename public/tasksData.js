const tasksData = [ {
    id: 1,
    projectTitle: 'Home tasks',
    groups: [
        {   
            id: 1,
            groupTitle: 'Todo',
            tasks: [{ id: 1, taskTitle: 'First task todo' }, { id: 2, taskTitle: 'Second task todo' }, { id: 3, taskTitle: 'Theird task todo' }]
        },
        {
            id: 2,
            groupTitle: 'Doing',
            tasks: [{ id: 1, taskTitle: 'First task doing' }, { id: 2, taskTitle: 'Second task doing' }, { id: 3, taskTitle: 'Theird task doing' }]
        },
        {
            id: 3,
            groupTitle: 'Done',
            tasks: [{ id: 1, taskTitle: 'First task done' }, { id: 2, taskTitle: 'Second task done' }]
        }
    ],
}   
];

export default tasksData;