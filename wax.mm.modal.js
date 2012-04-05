wax = wax || {};
wax.mm = wax.mm || {};

// modal
// --------
// A light modal component
// modal takes in three parameters: a map object,
// a template to attach dom elements to the popup and
// an options object that accepts an attachForm
// and callback value.
wax.mm.modal = function(map, template, options) {
    var mm = com.modestmaps;
    var t = template || '';

    var modal = {};
    modal.options = options || {}
    var active, modalPopup;

    var modalLink = document.createElement('a');
    modalLink.href = '#modal';
    modalLink.className = 'wax-modal';
    modalLink.innerHTML = modal.options.linkTitle || 'Info';

    var closeLink = '<a href="#" id="close">&times;</a>';

    mm.addEvent(modalLink, 'click', function(e) {
        mm.cancelEvent(e);
        if (!active) {
            modalPopup = document.createElement('div');
            modalPopup.className = 'wax-modal-box';
            modalPopup.innerHTML = closeLink + t;
            modal.options.attachForm ? modal.options.attachForm.appendChild(modalPopup) : map.parent.appendChild(modalPopup);
            active = true;
            modal.closemodal();
        } else {
            map.parent.removeChild(modalPopup);
            active = false;
        }
        modal.callback();
    });

    modal.callback = function() {
        if (modal.options.callback && typeof(modal.options.callback) === 'function') { modal.options.callback(); }
    }

    modal.closeEvents = function() {
        modal.options.attachForm ? modal.options.attachForm.removeChild(modalPopup) : map.parent.removeChild(modalPopup);
        modal.callback();
        active = false;
    }

    modal.closemodal = function() {
        var close = document.getElementById('close');
        mm.addEvent(close, 'click', function(e) {
            mm.cancelEvent(e);
            modal.closeEvents();
        });
        mm.addEvent(document, 'keydown', function(e) {
            if (e.keyCode === 27 && active) {
                modal.closeEvents();
            }
        });
    };

    modal.appendTo = function(elem) {
        wax.util.$(elem).appendChild(modalLink);
        return this;
    };
    return modal;
};
