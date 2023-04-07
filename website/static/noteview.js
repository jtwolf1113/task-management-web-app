var converter = new showdown.Converter();

var md = document.querySelector('#note-content').textContent;
console.log(md);
var html = converter.makeHtml(md);
document.querySelector('#note-content').innerHTML = html;
