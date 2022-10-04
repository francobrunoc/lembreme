    const fs = require('fs')

function parseCSSText(cssText) {
    var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ");
    var style = {}, [,ruleName,rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/)||[,,cssTxt];
    var cssToJs = s => s.replace(/\W+\w/g, match => match.slice(-1).toUpperCase());
    var properties = rule.split(";").map(o => o.split(":").map(x => x && x.trim()));
    for (var [property, value] of properties) style[cssToJs(property)] = value;
    return {cssText, ruleName, style};
}

function convert(property) {
    console.log(property)
    return property
}

(() => {
    fs
        .readdirSync('./')
        .forEach((file) => {
            if (file.includes('pxtovw.js')) return
            fs.readFile(file, (error, file) => {
                if (file) {
                    // console.log(file.toString('utf-8', 0, file.length))
                    let css = parseCSSText(file.toString('utf-8', 0, file.length)).cssText
                    console.log(JSON.parse(css))
                    console.log(css.substring(css.indexOf('px') - 10, css.indexOf('px')))
                    // if (style.width) { if (style.fontSize?.includes('px')) convert(style.fontSize) }
                    // console.log(css.style)
                }
            })
        })
    // console.log(files)
    let css = parseCSSText('.big { margin-top: 10px } .large { margin-top: 15px }')
    // console.log(css)
})()