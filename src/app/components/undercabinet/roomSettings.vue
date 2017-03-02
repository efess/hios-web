
    <!--<div className='container-fluid'>
        <div className="row">
            <div className="col-sm-6">
                <div style={s.row} className="row">
                    <div style={s.label} className="col-xs-4">Color</div>
                    <div style={s.control} className="col-xs-8">
                        <div style={s.swatch} onClick={ this.colorClick }>
                            <div style={s.color} />
                        </div>
                        <Modal></Modal>
                            isOpen={this.state.displayColorPicker}
                            onRequestClose={this.colorClose}
                            style={s.modal} >
                            <div>
                                <SketchPicker 
                                    color={ color }
                                    onChangeComplete={ this.colorSelect }
                                    type='sketch'
                                    />
                            </div>
                        </Modal>
                    </div>
                </div> 
            </div>
            <div className="col-sm-6">
                
                <md-input-container>
                    <label for="brightness">Brightness</label>
                    <md-select name="brightness" id="brightness" v-model="brightness">
                        <md-option v-for="opt in brightnessOpts" 
                            :value="opt.value">{{opt.text}}</md-option>
                    </md-select>
                </md-input-container>
                <div style={s.row} className="row">
                    <div style={s.label} className="col-xs-4">Brightness</div>
                    <div style={s.control} className="col-xs-8"><Slider
                            value={minMax(0, 15, data.brightness)}
                            min={0}
                            max={15}
                            step={1}
                            onChange={createPropSetter('brightness').bind(this)}/></div>
                </div> 
                
                <div style={s.row} className="row">
                    <div style={s.label} className="col-xs-4">Animation</div>
                    <div style={s.control} className="col-xs-8"><SelectField
                            fullWidth={true}
                            value={data.animation}
                            onChange={createPropSetter('animation').bind(this)}
                        >
                            {animations.map(function(animation) {
                                return <MenuItem key={animation.value} value={animation.value} primaryText={animation.text}/>;
                            })}
                        </SelectField>
                    </div>
                </div>
                
                <div style={s.row} className="row">
                    <div style={s.label} className="col-xs-4">Transition</div>
                    <div style={s.control} className="col-xs-8"><SelectField
                            fullWidth={true}
                            value={data.transition}
                            onChange={createPropSetter('transition').bind(this)}
                        >
                            {transitions.map(function(transition) {
                                return <MenuItem key={transition.value} value={transition.value} primaryText={transition.text}/>;
                            })}
                        </SelectField>
                    </div>
                </div>
                <div style={s.row} className="row">
                    <div style={s.label} className="col-xs-4">Pattern</div>
                    <div style={s.control} className="col-xs-8"><Pallete 
                        pallete={data.pallete} 
                        updateValue={createPropSetter('pallete').bind(this)} 
                        />
                    </div>
                </div>
            </div>
        </div>
    </div> 
    -->
<template lang="pug">
    md-layout(md-gutter)
        md-layout(md-flex-xsmall='100', md-flex-small='100',md-flex-medium='50')
            | color picker
        md-layout(md-flex-xsmall='100', md-flex-small='100', md-flex-medium='50')
            md-input-container
                label(for='brightness')  Brightness
                    md-select#sel-brightness(name='brightness', v-model="brightness")
                        md-option(v-for="opt in brightnessOpts", :value='opt.value') {{opt.text}}

            md-input-container
                label(for='animation') Effect
                    md-select#sel-animation(name='animation', v-model="animation")
                        md-option(v-for="opt in animationOpts", :value='opt.value') {{opt.text}}

            md-input-container
                label(for='transition') Transition Effect
                    md-select#sel-transition(name='transition', v-model="transition")
                        md-option(v-for="opt in transitionOpts", :value='opt.value') {{opt.text}}
                        
            md-input-container
                label(for='pattern') Effect colors
                    md-select#sel-pattern(name='pattern', v-model="pattern")
                        md-option(v-for="opt in patternOpts", :value='opt.value') {{opt.text}}
            

</template>

<script>
import R from 'ramda';

const animations = [
    {value: 0, text: 'None'},
    {value: 1, text: 'Color motion'},
    {value: 2, text: 'Twinkle'},
    {value: 3, text: 'Rainbow'},
    {value: 4, text: 'Runner'},
    {value: 5, text: 'Discrete'},
    {value: 6, text: 'Fire'},
    {value: 7, text: 'Frequency'}
];

const transitions = [
    {value: 0, text: 'None'},
    {value: 1, text: 'Fade'},
    {value: 2, text: 'Pixelate'}
];

const brightnessOptions = [
    {value: 0, text: 'Off'},
    {value: 3, text: 'Faint'},
    {value: 7, text: 'Normal'},
    {value: 11, text: 'Bright'},
    {value: 15, text: 'Full'}
];

// function createPropSetter(propName) {
//     return function(e, value) {
//         var obj = {};
        
//         // hack.
//         if(propName === 'color') {
//             value = transformRgbToColor(value);
//         }
        
        
//         obj[propName] = value;
//         this.setState(obj);
//         this.props.updateValue(propName, value);
//     }
// }

// function transformRgbToColor(color) {
//     var rgb = color.rgb;
    
//     return (rgb.r << 16) | (rgb.g << 8) | rgb.b; 
// }

export default {
    name: "room-settings",
    data: () => ({
        transitionOpts: transitions,
        animationOpts: animations,
        brightnessOpts: brightnessOptions,
        brightness: 0,
        animation: 0,
        pattern: 0,
        transition: 0
    })
}

    
    // constructor(props){
    //     super(props);
        
    //     this.state = {
    //         brightness: 4,
    //         animation: 4,
    //         transition: 1,
    //         displayColorPicker: false
    //     };
    //     this.colorSelect = this.colorSelect.bind(this);
    //     this.colorClick = this.colorClick.bind(this);
    //     this.colorClose = this.colorClose.bind(this);
    // }
    
    // // handleBrightnessChange(value) {
        
    // // }
    // // handleAnimationChange(){}
    // // handleTransitionChange
    // colorSelect(value) {
    //     value = transformRgbToColor(value);
        
    //     this.setState({ color: value });
    // }
    
    // colorClick() {
    //     this.setState({ displayColorPicker: !this.state.displayColorPicker });
    // }

    // colorClose() {
    //     this.setState({ displayColorPicker: false });
        
    //     this.props.updateValue('color', this.state.color);
    // }
    
    // render() {
    //     Modal.setAppElement(document.body);
    //     var data = this.props.data || {};
    //     var decColor = this.state.color || data.color || 0;
        
    //     var color = { 
    //         r: decColor >> 16,
    //         g: (decColor >> 8) & 0xFF, 
    //         b: decColor & 0xFF 
    //     }
        
    //     var minMax = function(min, max, value) {
    //         return value < min ? 0 :
    //             value > max ? max : value;
    //     }
        
    //     var s = {
    //         label: { 
    //             //display: 'table-cell', 
    //             //width: '120px', 
    //             textAlign: 'right',
    //             verticalAlign: 'top', 
    //             paddingTop: '15px'
    //         },
    //         control: { 
    //             //display: 'table-cell' 
                
    //         },
    //         row: { 
    //             //display: 'table-row' 
    //         },
    //         section: {float: 'left'},
    //         color: {
    //             width: '70px',
    //             height: '45px',
    //             borderRadius: '4px',
    //             background: 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')',
    //         },
    //         swatch: {
    //             padding: '5px',
    //             background: '#fff',
    //             borderRadius: '1px',
    //             boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    //             display: 'inline-block',
    //             cursor: 'pointer',
    //         },
    //         modal: {
    //             overlay : {
    //                 position          : 'fixed',
    //                 top               : '0px',
    //                 left              : '0px',
    //                 right             : '0px',
    //                 bottom            : '0px',
    //                 backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    //                 zIndex            : 3
    //             },
    //             content:{
    //                 border: '0px',
    //                 padding: '10px',
    //                 backgroundColor: 'rgba(255, 255, 255, 0.0)',
    //                 top: '90px',
    //                 right: '60px',
    //                 bottom: 'auto',
    //                 left: 'auto'
    //                 //boxShadow: '0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)'
    //             }
    //         }
    //     };
           
    //     return (
             
    //     ); 
        
    // }

</script>
<style>

</style>