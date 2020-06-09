$(() => {
    $('.table').on('click', 'tr', (e)=>{
        console.log($(e.currentTarget).data('link'))
    })
})
