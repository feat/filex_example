import React, { useState } from 'react'
import Lightbox from "react-image-lightbox";
import './EventPlates.css'

function EventPlates(props) {
    const { data } = props;
    const count = data.length;
    const [ state, setState ] = useState({
        isOpen: false,
        index: 0,
      });
    return (
        <div className='EventPlates'>
            {data.map((item, index) => (
                <div 
                    className="EventPlates__item"
                    key={item.id}
                    style={{
                        backgroundImage: `url(${item.photo})`
                    }}
                    onClick={() => {
                        setState({
                            isOpen: true,
                            index,
                        })
                    }}
                ></div>
            ))}
            {state.isOpen && (
                <Lightbox
                    mainSrc={data[state.index].photo}
                    nextSrc={data[(state.index + 1) % count].photo}
                    prevSrc={data[(state.index + count - 1) % count].photo}
                    onCloseRequest={() => setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                        setState({
                            isOpen: true,
                            index: (state.index + count - 1) % count,
                        })
                    }
                    onMoveNextRequest={() =>
                        setState({
                            isOpen: true,
                            index: (state.index + 1) % count,
                        })
                    }
                />
            )}
        </div>
    )
}

export default EventPlates;