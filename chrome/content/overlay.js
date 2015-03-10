/* ***** BEGIN LICENSE BLOCK *****
*   The contents of this file are subject to the Pale Moon Freeware License
*   You may not use this file except in compliance with the License. 
*   You may obtain a copy of the License at http://www.palemoon.org/freeware-license.shtml
*   
*   Software distributed under the License is distributed on an "AS IS" basis,
*   WITHOUT WARRANTY OF ANY KIND, either express or implied. 
*   
*   The Original Code is Pale Moon Commander.
*   
*   The Initial Developer of the Original Code is 
*   Mark Straver <moonchild@palemoon.org>.
*   
*   This code is Copyright (C) 2012-2015 the Initial Developer. All Rights Reserved.
*    
*   ***** END LICENSE BLOCK *****  */

var PalemoonCommander =
{
   openOptions: function(){		
		/* 
		 * instantApply needs dialog = no
		 * Copied from chrome://mozapps/content/extensions/extensions.js in Firefox
		 * Codes from littlebtc
		 */
		var features;
		var instant_apply = true;
		try {
			var root_prefs = Components.classes["@mozilla.org/preferences-service;1"]
			                           .getService(Components.interfaces.nsIPrefBranch);
			instant_apply = root_prefs.getBoolPref("browser.preferences.instantApply");
			features = "chrome,titlebar,toolbar,centerscreen" + (instant_apply ? ",dialog=no" : ",modal");
		} catch (e) {
			features = "chrome,titlebar,toolbar,centerscreen,modal";
		}

/*		pref_window = window.openDialog('chrome://pmcommander/content/prefs.xul', '', features, 'pmcommander-pane-graphics'); */
		pref_window = window.openDialog('chrome://pmcommander/content/prefs.xul', '', features);
		pref_window.focus();
	}
}


