const xmldom = require("@xmldom/xmldom");

global.DOMParser = xmldom.DOMParser;
global.XMLSerializer = xmldom.XMLSerializer;