(function(window) {
	'use strict';

	/**
	 * CSS replacing class
	 * @constructor
	 */
	var Replace = function(options) {

		this._cssFiles = {
							"from": ["globals.css"],
							"to":   ["assets/css/odesk.css"]
						};
		this._host = "https://www.odesk.com/";
		this._messagesAjaxPath = "api/mc/v2/trays/";
		this._messageBoxFileName = "/inbox.json";
		this._messages = null;
		this._username = this.getUsername();

	};

	/**
	 * Definition of prototype
	 */
	Replace.prototype = {
		/**
		 * Initializer
		 * To do
		 */
		init: function() {
			this.addFakeMessageNav();
			this._username = this.getUsername();
			return this;
		},


		/**
		 * Getting oDesk username from page
		 */
		getUsername: function() {
			return $('div#simpleCompanySelector ul.oDropdownList li.oDropdownFooter.unselectable span.oNavMutedText').text();
		},

		/**
		 * Replace function
		 */
		replace: function() {
			if (this._cssFiles == undefined || this._cssFiles == null)
				return;

			if ( this._cssFiles.from != null ) removeStyleInfo(this._cssFiles.from);
			if ( this._cssFiles.to != null ) addStyleInfo(this._cssFiles.to);
		},

		/**
		 * Param setting
		 * This would be extended later....
		 */
		setParams: function(params) {
			if (params == undefined)
				return;

			if (params)
				this._cssFiles = params;
		},

		/**
		 * Add fake menu "Test Message" to test
		 */
		addFakeMessageNav: function() {
			var $navContainer = $('nav.oNavInline ul.oNavTablist'),
				$navItem = $('<li/>', {'class': 'jsNavMC', 'id': 'oNavFakeNavItem'}).append($('<a/>', {'class':'oNavTab jsNavMC'}).text('Test Messages'));

			$navContainer.append($navItem);
			$navItem.click(this.fakeMessageHandler);
		},


		/**
		 * Test menu handler
		 * This occurs when user click the "Test Message" menu item
		 */
		fakeMessageHandler: function(event) {
			event.preventDefault();
			$('nav.oNavInline ul.oNavTablist a.oNavTab.isCurrent').removeClass('isCurrent');
			$('nav.oNavInline ul.oNavTablist li#oNavFakeNavItem a').addClass('isCurrent');

			var address = self._host + self._messagesAjaxPath + self._username + self._messageBoxFileName;

			$.getJSON(address, self.renderSection);
		},

		/**
		 * Render the whole messages section
		 */
		renderSection: function(data) {
			var $messageContainer = $('div#main'),
				threads = data.current_tray.threads,
				$leftSideBar = $('<div/>', {'class': 'oFakeMessageLeftSideBar'}),
				$content = $('<div/>', {'class': 'oFakeMessageContent'}),
				$leftTop = $('<div/>', {'class': 'leftTopBar'}),
				$contentTop = $('<div/>', {'class': 'contentTopBar'}),
				$leftSearchSpan = $('<span/>', {'class': 'oFakeMessageSearch', 'id': 'oFakeLeftSearch'}),
				$leftDropdownSpan = $('<span/>', {'class': 'oFakeDropdown', 'id': 'oFakeLeftDropdown'}),
				$leftDropdownDiv = $('<div/>', {'class': 'leftDropdownDiv'}),
				$leftDropdownUl = $('<ul/>', {'class': 'dropdown'}),
				$leftDropdownUlSpan = $('<span/>', {'class': 'triangle'}).appendTo($leftDropdownUl),
				$dropdownCreateNewWorkRoom = $('<li/>', {'class': 'dropdownItem', 'id': 'createNewWorkRoom'}).text("Create new Work Room").appendTo($leftDropdownUl),
				$dropdownInviteSomeoneToChat = $('<li/>', {'class': 'dropdownItem', 'id': 'inviteSomeoneToChat'}).text("Invite Someone To Chat").appendTo($leftDropdownUl),
				$dropdownSeeAllPublicRooms = $('<li/>', {'class': 'dropdownItem', 'id': 'seeAllPublicRooms'}).text("See All Public Rooms").appendTo($leftDropdownUl),
				$dropdownDivider1 = $('<li/>', {'class': 'dropdownItem dropdownDivider', 'id': 'divider1'}).text("-----").appendTo($leftDropdownUl),
				$dropdownManageFiles = $('<li/>', {'class': 'dropdownItem', 'id': 'manageFiles'}).text("Manage Files").appendTo($leftDropdownUl),
				$dropdownManageContacts = $('<li/>', {'class': 'dropdownItem', 'id': 'manageContacts'}).text("Manage Contacts").appendTo($leftDropdownUl),
				$dropdownManageArchivedRooms = $('<li/>', {'class': 'dropdownItem', 'id': 'manageArchivedRooms'}).text("Manage Archived Rooms").appendTo($leftDropdownUl),
				$dropdownDivider2 = $('<li/>', {'class': 'dropdownItem dropdownDivider', 'id': 'divider2'}).text("-----").appendTo($leftDropdownUl),
				$dropdownMessageNotificationSettings = $('<li/>', {'class': 'dropdownItem', 'id': 'messageNotificationSettings'}).text("Message Notification Settings").appendTo($leftDropdownUl),
				$contentDropdownSpan = $('<span/>', {'class': 'oFakeDropdown',  'id': 'oFakeContentDropdown'}),
				$contentSearchSpan = $('<span/>', {'class': 'oFakeMessageSearch', 'id': 'oFakeContentSearch'});

			$messageContainer.children().hide();
			$leftDropdownSpan.append($leftDropdownDiv.append($leftDropdownUl))
			$leftTop.append($('<h6/>', {'class': 'leftTopTitle', 'id': 'leftTopTitle'}).text("Rooms"), $leftDropdownSpan, $leftSearchSpan);
			$contentTop.append($('<h6/>', {'class': 'contentTopTitle', 'id': 'contentTopTitle'}).text(threads[0].subject), $contentDropdownSpan, $contentSearchSpan);
			$messageContainer.append($leftSideBar.append($leftTop), $content.append($contentTop));

			$(document).click(function(event) {
				// event.preventDefault();

				var $el = $(event.target);
				if ( $el.attr('id') == "oFakeLeftDropdown") {
					$leftDropdownDiv.show();
				} else if( $el.parents('span.oFakeDropdown#oFakeLeftDropdown').length == 0 ) {
					$leftDropdownDiv.hide();
				} else if ( $el.hasClass('dropdownItem') && !($el.hasClass('dropdownDivider'))) {
					alert($el.text());
				}
			});

			self.renderLeftSide($leftSideBar, threads);
		},

		/**
		 * Render left side bar
		 */
		renderLeftSide: function(container, threads) {
			var $favoriteContainer = $('<ul/>', {'id': 'leftSideFavorite', 'class': 'roomCategory'}).append($('<h6/>', {'class': 'categoryTitle'}).text("favorites")),
				$recentContainer = $('<ul/>', {'id': 'leftSideRecent', 'class': 'roomCategory'}).append($('<h6/>', {'class': 'categoryTitle'}).text("recent")),
				$olderContainer = $('<ul/>', {'id': 'leftSideOlder', 'class': 'roomCategory'}).append($('<h6/>', {'class': 'olderTitle'}).text("older...")),
				ind = 0;

			for (var i = 0; i < threads.length; i++) {
				var curThread = threads[i],
					$li = $('<li/>', {'class': 'item'}),
					$tag = $('<span/>', {'class': 'mark'}),
					$title = $('<h6/>', {'class': 'title'});

				$li.attr('link', threads[i].thread_api).append($tag, $title.text(curThread.subject.threeDots(22)));

				if(i < 3) {
					$favoriteContainer.append($li);
				}else if (i < 7) {
					$recentContainer.append($li);
				}else {
					$olderContainer.append($li.addClass('hide'));
				}
			}

			container.append($favoriteContainer, $recentContainer, $olderContainer);
			$('div.oFakeMessageLeftSideBar li.item').click(self.renderRightContent);
			$($('div.oFakeMessageLeftSideBar li.item')[0]).click();
		},

		/**
		 * Render message content
		 */
		renderRightContent: function() {
			//
			var threadURL = "https://www.odesk.com/" + $(this).attr('link');
			$.getJSON(threadURL, function(response) {

			})

		},

		/**
		 * Render content of thread
		 */
		renderContent: function(container, thread) {

		}
	};

	var self = window.Replace = new Replace();

})(window);