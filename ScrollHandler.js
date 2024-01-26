import React, { useEffect, useState, useRef } from 'react';


/**
 * 
 * @param {children} hijo
 * @param {ULclassName} classname del ul
 * @param {boolEventListener} bool Donde True se usará si el elemento siempre estará presente, enviar false o no enviar nada si es un elemento temporal y no hará falta renderizar permanente (ejemplo, un {xbool && (<ScrollHandler> ... </ScrollHandler>)})   
 * @returns 
 */
const ScrollHandler = ({ children, ULclassName }) => {
    const [porcentajeDesplazado, setPorcentajeDesplazado] = useState(0);
    const scrollRef = useRef(); // Crear una referencia

    useEffect(() => {
        const handleScroll = () => {
            const nuevoPorcentaje = (scrollRef.current.scrollTop / (scrollRef.current.scrollHeight - scrollRef.current.clientHeight)) * 100;
            setPorcentajeDesplazado(nuevoPorcentaje);
            console.log(nuevoPorcentaje);
        };

        // Adjuntar el evento de scroll al div en lugar de al window
        scrollRef.current.addEventListener('scroll', handleScroll);

        return () => {
            scrollRef.current.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <style>
                {`
          ::-webkit-scrollbar {
            width: 30px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(150, 62, 24, 0.2);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: no-repeat center/80% url('Si desea añadir alguna imagen');
            background-size: contain;
            border-radius: 10px;
            background-position: 0% ${porcentajeDesplazado}%;
          }
        `}
            </style>
            {/* Envolver children en un div con la referencia */}

            <ul ref={scrollRef} className={ULclassName} style={{ overflow: 'auto' }}>
                {children}
            </ul>
        </>
    );
};

export default ScrollHandler;

