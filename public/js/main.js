$(() => {
    $('.table').on('click', 'tr', (e)=>{
        window.location.href = '/flight/detail/' + $(e.currentTarget).data('link')
    })

})
