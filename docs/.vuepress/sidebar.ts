

const SidebarConfig = {
    '/guide/': [
        {
            text: '基础',
            collapsible: true,
            children: ['/guide/quickstart']
        },
        {
            collapsible: true,
            children: ['/guide/envirmoment']
        }
    ],
    '/components/': [{
        text: 'Form',
        collapsible: true,
        children: [{
            text: 'TreeSelect 树形选择',
            link: '/components/Form/TreeSelect',
        }]
    }]
}

export default SidebarConfig