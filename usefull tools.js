/*Author: Tom Marra 
**Email: Tmarradesign@gmail.com
**~JavaScript Tools Library~
**Taken from awesome singleton Scripts I've written or had shared 
**with me that can be helpful in any situation
*/

//=##=================================================================================================##=//
//=##= UTILITY METHODS ===============================================================================##=//
//=##=================================================================================================##=//

util = {

    //=##= Array METHODS =============================================================================##=//
    array :
    {   
        //=##= randomizes and array ==================//
        //=##= parameter: array     ==================//    
        randomize : function randomize(array)
        {
            array.sort(function(){
                return (Math.round(Math.random())-0.5);
            });
            return array;
        },

        //=##= removes an item from an array by index =============//
        //=##= parameter: array, int     ==========================//
        removeItem : function removeItem(array, item)
        {
            var idx = array.indexOf(item);
            if(idx != -1)
            {
                array.splice(idx, 1);
            };
        },

        //=##= converts an Associative Array To a normal Array ==================//
        //=##= parameter: array(with key:val pairs)     ==================//
        convertAssociativeArrayToArray : function convertAssociativeArrayToArray(associativeArray)
        {
            var array = [];
            for(var key in associativeArray)
            {
                var item = associativeArray[key];
                if(typeof item == "string")
                {
                    item = {
                        value : item
                    };
                }

                item.associativeKey = key;
                array.push(item);
            }

            return array;
        },

        //=##= sorts an associative arry of numerical values =============//
        //=##= parameter: array, key     =================//
        sortArrayNumberical : function sortArrayNumberical(array, propertyToSortBy)
        {
            return array.sort(function(a, b)
            {
                if(a[propertyToSortBy] > b[propertyToSortBy])
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
            });
        },

        //=##= returns an array of keys from an associative array =============//
        //=##= parameter: array     ===========================================//
        getKeys : function getKeys(obj) {
        var keys = [], i;
        for (i in obj){
            if (obj.hasOwnProperty(i)) {
                keys.push(i);
            }
        }
        return keys;
        }       
    },
    
    //=##= Text METHODS =============================================================================##=//    
    text :
    {
        //=##= caps the first letter of every word =============//
        //=##= parameter: string     ===========================//
        toProperCase : function toProperCase(str)
        {
            return str.toLowerCase().replace(/^(.)|\s(.)/g, function($1) {
                return $1.toUpperCase();
            });
        },

        //=##= shortens text to limit int and adds ellipsis =============//
        //=##= parameter: string, int     =================//
        truncate : function truncate(str, n) {
            var limit, check, output;
            if (str.length >= n){
                limit = str.lastIndexOf(" ", n);
                if (limit === -1){
                    output = str.slice(0, n-3) + "...";
                }
                check = str.slice(0, limit) + "...";
                output = ((check.length > n) ? this.truncate(check, n) : check);
            } else {
                output = str;
            }
            return output;
        },

        //=##= adds commas to very long numbers =============//
        //=##= parameter: int     ===========================//
        commify : function commify(num) {
            var splitter = num.toString().split("."),
                bigNum = splitter[0],
                decimals = (splitter.length > 1) ? splitter[1] : "",
                commad = "",
                lastChar;
            while (bigNum.length > 3){
                lastChar = bigNum.substr(bigNum.length-3);
                bigNum   = bigNum.slice(0, bigNum.length-3);
                commad = "," + lastChar + commad;
            }
            return bigNum + commad + ((splitter.length > 1) ? "." + decimals : "");
        },

        //=##= checks a string to see if there are HTML Entities in it I.E. &nbsp; ====//
        //=##= parameter: string     ==================================================//
        hasHTMLEncoded : function hasHTMLEncoded(s)
        {
            if(/&[A-Z]{2,6};/gi.test(s)){
                return true;
            }
        },

        //=##= removes HTML Entities from a string =============//
        //=##= parameter: string     ===========================//
        deHTML : function deHTML(s)
        {
            var text = s,
            //an associative array of common HTML Entities more can be added to this list if needed from http://www.w3schools.com/tags/ref_entities.asp
            entities = {"&quot;" : '"', "&apos;" : "'", "&amp;" : "&", "&lt;" : "<", "&gt;" : ">"};
            
            //strip all tags from the string and split the string into a pretty array
            var allThatRemains = text.replace(/&[A-Z]{2,6};/gi, function (match){
                return entities[match] != undefined ? entities[match] : match;
            });

            return allThatRemains;        
        }
    },

    //=##= HTML METHODS =============================================================================##=//
    HTML:
    {
        //=##= finds current mouse xy cords ==============//
        //=##= parameter: event     ======================//
        mouse : function mouse(e)
        {
            posx = 0;
            posy = 0;
            if (!e) var e = window.event;
            if (e.pageX || e.pageY)     {
                posx = e.pageX;
                posy = e.pageY;
            }
            else if (e.clientX || e.clientY)    {
                posx = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
            }
            return {
                x : posx,
                y : posy
            };
        },

        //=##= scrolls browser to passed dom element =============//
        //=##= parameter: obj     ================================//
        scrollToDom : function scrollToDom(domNode)
        {
            console.log(domNode);
            var topPos = 0;
            //based off of the parent node find the offset
            if (domNode.offsetParent) {
                do {
                    topPos += domNode.offsetTop;
                } while (domNode = domNode.offsetParent);
            }
            //console.debug("top Pos = " + topPos);
            scrollTo(0, topPos);
        }
    },

    //=##= Date METHODS =============================================================================##=//
    date : 
    {
        //=##= converts 24 hour time to 12 hour time =============//
        //=##= parameter: int     ================================//
        twelveHrTime : function twelveHrTime(hr) {
            var output = hr;
            if (hr === 0) {
                output = 12;
            } else if (hr > 12) {
                output = hr - 12;
            }
            return output;
        },

        //=##= converts number to month name =============//
        //=##= parameter: int     ========================//
        getFullMonthName : function getFullMonthName(month)
        {
            var monthNames = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            return monthNames[month];
        }
    }
}