document.body.style.border = "8px solid blue";  //Keeping this to make visually sure I got the extension active

//Get page language
const selectedLanguage = document.documentElement.lang;

//Main match pool
const matchingStrings = {
    "es": {
        "speculation": [
            "inversores",
            "oportunidad de inversión",
            "oportunidad para inversores",
            "rendibilidad",
            "rentabilidad",
            "activo"
        ],
        "inhabited": [
            "no se pueden realizar visitas",
            "no visitable",
            "sin posesión",
            "ocupado",
            "okupado"
        ],
        "unfinished": [
            "no finalizada",
            "inacabada"
        ],
        "legal_nightmares": [
            "no se puede hipotecar",
            "no permite hipoteca",
            "no hipotecable",
            "procedimiento judicial",
            "participación indivisa",
            "sin posibilidad de hacer cambio de uso",
            "sin escrituras",
            "indivisa",
            "copropiedad",
            "cesion de remate"
        ],
        "other_horrors": [
            "no dispone de cédula de habitabilidad"
        ]
    },
    "cat": {
        "speculation": [
            "inversors",
            "oportunitat d'inversió",
            "oportunitat per inversors",
            "rendibilitat",
            "rentabilitat",
            "actiu"
        ],
        "inhabited": [
            "no es poden realitzar visitas",
            "no visitable",
            "sense posessió",
            "ocupat",
            "okupat"
        ],
        "unfinished": [
            "no finalitzada",
            "inacabada"
        ],
        "legal_nightmares": [
            "no es pot hipotecar",
            "no hipotecable",
            "no permet hipoteca",
            "participació indivisa",
            "procediment judicial",
            "sense possibilitat de fer canvi d'ús",
            "sense escriptures",
            "indivisa",
            "copropietat",
            "cessió de remat"
        ],
        "other_horrors": [
            "no disposa de cèdula d'habitabilitat"
        ]
    }
}

//"human readable" meanings for the keys and extended explanation
const issueKeyMeanings = {
    "speculation": {
        "name": "Especulación",
        "description": "Viviendas que no se venden para que viva gente sino para hacer dineros especulando"
    },
    "inhabited": {
        "name": "Ocupada",
        "description": "Vivienda en la que vive alguien, ya sea de manera legal (ej. gente que aún está viviendo de alquiler en esa casa, o aún le queda contrato), o bien de manera ilegal."
    },
    "unfinished": {
        "name": "Inacabada",
        "description": "Una vivienda que se empezó a construir pero no se terminó. Puede ser aprovechable o una ruina total que hay que volver a hacer."
    },
    "legal_nightmares": {
        "name": "Movidas legales",
        "description": "Viviendas con deudas, en proceso de subasta judicial, que no figuran legalmente como viviendas (e.j. locales) y otras movidas turbias que nadie quiere comerse."
    },
    "other_horrors": {
        "name": "Otros horrores",
        "description": "Pisos o casas con dudosa habitabilidad o estado legal, o bien pisos en muy mal estado con fotos retocadas con IA que pueden llevar a engaño, etc."
    }
}

const foundTrashResults = [];

const searchResults = document.querySelectorAll(
    "#main-content > section > article.item > div.item-info-container > div.item-description"
);
if (searchResults && searchResults.length) {
    searchResults.forEach(element => {
        //Check for 'banned' keywords
        for (issueType in matchingStrings['es']) {
            matchingStrings['es'][issueType].forEach(issue => {
                if (element.innerText.includes(issue)) {
                    //Return articleID 
                    foundTrashResults.push({
                        element: element.parentNode.parentNode,
                        id: element.parentNode.parentNode.dataset.elementId,
                        issueType: issueType
                    });
                }
            })
        }
    });
}

console.log(foundTrashResults);

foundTrashResults.forEach(foundResult => {
    const tagsPlaceholder = foundResult.element.querySelector('.item-info-container > .item-description');
    const newTagContainer = document.createElement('div');
    newTagContainer.textContent = `-- ${issueKeyMeanings[foundResult.issueType].name} --`;
    newTagContainer.title = `${issueKeyMeanings[foundResult.issueType].description}`;
    newTagContainer.style.backgroundColor = '#c72c2c';
    newTagContainer.style.color = 'white';
    newTagContainer.style.fontWeight = 800;
    newTagContainer.style.padding = '8px';
    tagsPlaceholder.appendChild(newTagContainer);
})