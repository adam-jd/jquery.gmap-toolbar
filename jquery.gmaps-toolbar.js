(function($) {
    
    /**
     * Function to Create and handle the click event for the toolbar icon.
     * @param {div} element - The toolbar div 
     * @param {object} options - the plugin options
     * @returns {div} - The created toolbar div 
     */
    function CreateToolBarIcon(element,options) {
        
        // classes to handle the expanding and contracting of the toolbar
        var toolbarIconFAClass_expanded = "";
        var toolbarIconFAClass_contracted = "";
        
        // create the toolbar icon
        var $toolbarIcon = $("<div>");
         $toolbarIcon.addClass('toolbarIcon');
        var $toolbarIconSpan = $("<span>");
        var $toolbarIconSpan_i = $("<i>");
        $toolbarIconSpan_i.addClass("fa");

        // set the correct position of the icon in relation to this absolutely bound position
        if (options.position == google.maps.ControlPosition.LEFT_TOP || options.position == google.maps.ControlPosition.LEFT_CENTER || options.position == google.maps.ControlPosition.LEFT_BOTTOM) {

            toolbarIconFAClass_expanded = "fa-angle-double-left";
            toolbarIconFAClass_contracted = "fa-angle-double-right";
            $toolbarIcon.addClass("toolbarIconPosition_left");
        } else {
            toolbarIconFAClass_expanded = "fa-angle-double-right";
            toolbarIconFAClass_contracted = "fa-angle-double-left";
            $toolbarIcon.addClass("toolbarIconPosition_right");
        }

        // set the default state of the toolbar
        if (options.open) {
            $toolbarIcon.attr("title", "Hide Menu");
            $toolbarIcon.data('expanded', true);
            $toolbarIconSpan_i.addClass(toolbarIconFAClass_expanded);
        } else {
            $toolbarIcon.attr("title", "Show Menu");
            $toolbarIcon.data('expanded', false);
            $toolbarIconSpan_i.addClass(toolbarIconFAClass_contracted);
        }


        $toolbarIconSpan.append($toolbarIconSpan_i);
        $toolbarIcon.append($toolbarIconSpan);

        // Handle the click event of the toolbar icon
        $toolbarIcon.click(function () {

            var expanded = $(this).data('expanded');

            if (expanded) {
                $(element).css('width', "0px");
                $(this).find("i").addClass(toolbarIconFAClass_contracted);
                $(this).find("i").removeClass(toolbarIconFAClass_expanded);
                $(this).data('expanded', false);
            } else {
                $(element).css('width', options.width);
                $(this).find("i").removeClass(toolbarIconFAClass_contracted);
                $(this).find("i").addClass(toolbarIconFAClass_expanded);

                $(this).data('expanded', true);
            }
        });

        return $toolbarIcon;
    }

    /**
     * Initialise the toolbar on the map
     * @param {div} element - The toolbar div 
     * @param {object} options - the plugin options     
     */
    function InitMapToolbar(element, options) {

        var map = options.map;

        // set the position of the toolbar on the map
        map.controls[options.position].push(element);

        // add the toolbar icon to the toolbar div
        var $toolbarIcon = CreateToolBarIcon(element,options);
        $(element).append($toolbarIcon);
    }

    $.fn.gmaptoolbar = function(options, params) {
            return this.each(function() {       
                InitMapToolbar(this,options);
            });
        }
    }

(jQuery));