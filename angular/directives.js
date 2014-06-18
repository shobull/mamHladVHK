angular.module('app.directives', [])

    .directive('focusIter', function () {

        return function (scope, elem, attrs) {
            var atomSelector = attrs.focusIter;

            elem.on('keyup', atomSelector, function (e) {
                    var atoms = elem.find(atomSelector),
                        toAtom = null;

                    for (var i = atoms.length - 1; i >= 0; i--) {
                        if (atoms[i] === e.target) {
                            if (e.keyCode === 38) {
                                toAtom = atoms[i - 1];
                            } else if (e.keyCode === 40) {
                                toAtom = atoms[i + 1];
                            }
                            break;
                        }
                    }

                    if (toAtom) {
                        toAtom.focus();
                        if (toAtom.type == "textarea" || toAtom.type == "number" || toAtom.type == "text") {
                            toAtom.select();
                        }
                    }

                }
            );

            elem.on('keydown', atomSelector, function (e) {
                if (e.keyCode === 38 || e.keyCode === 40)
                    e.preventDefault();
            });

        };
    })
;