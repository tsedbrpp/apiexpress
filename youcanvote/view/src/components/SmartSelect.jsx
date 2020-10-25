
import React, {useState} from "react";
import Select from 'react-select';
import chroma from 'chroma-js';
import PropTypes from "prop-types";



const dot = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? data.color
                    : isFocused
                        ? color.alpha(0.1).css()
                        : null,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
            },
        };
    },
    input: styles => ({ ...styles, ...dot() }),
    placeholder: styles => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const SmartSelect =( (props) => {

    const [valueSelected, setSelectedValue] = useState();



    const handleChangeOption = ( selectedOption => {
     //   setSelectedValue({ lvPair: selectedOption });
        props.setter(selectedOption.value, props.name);
        console.log(`Option selected:`, selectedOption.value);
    })


   return ( <Select
          label="Single select"
           styles={colourStyles}
        variant="outlined"
        fullWidth
        value={props.selected}
        onChange={handleChangeOption}
        options = {props.options}
    >
    </Select>
   )
})

Select.propTypes = {
    options: PropTypes.array,
     name:PropTypes.string,
    selected:PropTypes.array
}
export default SmartSelect


