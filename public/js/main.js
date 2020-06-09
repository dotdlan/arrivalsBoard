$(() => {
    $('.table').on('click', 'tr', (e)=>{
        window.location.href = '/flight/' + $(e.currentTarget).data('link')
    })

})
