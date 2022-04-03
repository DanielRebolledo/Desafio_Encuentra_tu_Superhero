$(document).ready(function(){

    const BotonBuscar       = $('#buscar')
    const InputIdSuperHeroe = $('#SuperHeroId');
    const SeccionSuperHeroe = $('#SuperHero-data');

    const SuperheroImg         = $('#superhero-details img');
    const SuperheroName        = $('#superhero-details .nombre');
    const SuperheroConnection  = $('#superhero-details .conexiones');
    const SuperheroPublisher   = $('#superhero-details .publicacion');
    const SuperheroOccupation  = $('#superhero-details .ocupacion');
    const SuperheroAppearance  = $('#superhero-details .aparicion');
    const SuperheroHeight      = $('#superhero-details .altura');
    const SuperheroWeight      = $('#superhero-details .peso');
    const SuperheroAliases     = $('#superhero-details .alianzas');

    const SuperheroStatsSection = $('#superheroStats');
    
    BotonBuscar.click(() => {
        const IdSuperHeroe = InputIdSuperHeroe.val();
        console.log(IdSuperHeroe)
        
        $.ajax(`https://www.superheroapi.com/api.php/4905856019427443/${IdSuperHeroe}`)
        .done((data) => {
            
            //Tabla
            SuperheroImg.attr('src', data.image.url)
            SuperheroName.html(`Nombre: ${data.name}`)
            SuperheroConnection.html(`Conexiones: ${data.connections['group-affiliation']}`)
            SuperheroPublisher.html(`Publicado por: ${data.biography.publisher}`)
            SuperheroOccupation.html(`Ocupación: ${data.work.occupation}`)
            SuperheroAppearance.html(`Primera Aparición: ${data.biography['first-appearance']}`)
            SuperheroHeight.html(`Altura: ${data.appearance.height}`)
            SuperheroWeight.html(`Peso: ${data.appearance.weight}`)
            SuperheroAliases.html(`Alianzas: ${data.biography.aliases}`)
            
            console.log(data)


            //Gráfico
            const dataPoints = Object
            .entries(data.powerstats)
            .map((stats) => {
                return {y: stats[1], label: stats[0] }
            })

            const options = {
                title: {
                    text: `Estadísticas de poder para ${data.name}`
                },
                animationEnabled: true,
                data: [
                    {
                    type: "pie",
                    startAngle: 40,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: dataPoints
                }
                ]
            };
            SuperheroStatsSection.CanvasJSChart(options);
        
        })//<==Ajax
    
    
    
    })//<==Click botón
});//<==Document.ready