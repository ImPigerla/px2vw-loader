'use strict';

const assert = require('power-assert');
const Px2vw = require('../lib/px2vw');
const {resolve} = require('path')
const fs = require('fs');

describe('lib/px2vw.js', () => {
    describe('constructor', () => {
        it('Px2vw should be constructor', () => {
            assert(Px2vw.prototype.constructor === Px2vw)
        });
    })

    describe('#calculateValue(type, value)', () => {
        const px2vwInstance = new Px2vw()

        it('type should be "rem"', () => {
            assert(px2vwInstance.calculateValue('rem', '100px').indexOf('rem'))
        });

        it('calculate result should be 13.333333vw', () => {
            assert.equal(px2vwInstance.calculateValue('vw', '100px'), ((100/7.5).toFixed(6) + 'vw'))
        });
    })

    describe('#generateVw(cssText)', () => {
        const px2vwDefInstance = new Px2vw()
        const px2vwInstance = new Px2vw({
            datum: 75,
            multiple: 10,
            outputUnit: 'rem',
            precision: 10,
        })
        const srcPath = resolve(__dirname, '../assets/test.css');
        const srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});

        it('should output the default file', () => {
            var expectedPath = resolve(__dirname, '../assets/test.expected.vw.css');
            var outputText = px2vwDefInstance.generateVw(srcText);
            assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}).trim());
        });

        it('should output the right "rem" file', () => {
            var expectedPath = resolve(__dirname, '../assets/test.expected.rem.css');
            var outputText = px2vwInstance.generateVw(srcText);
            assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}).trim());
        });
    })
});
