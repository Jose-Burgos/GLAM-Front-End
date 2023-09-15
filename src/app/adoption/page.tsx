import React from 'react';

import Card from '@/components/card';

export default function AdoptView() {
  const cardData = [
    {
      img: 'https://www.proyecto4patas.org/wp-content/uploads/photo-gallery/thumb/Almendra_(1).jpeg?bwg=1694262163',
      name: 'Almendra',
      description: 'Perro de tamaño mediano. 3 meses de edad',
    },
    {
      img: 'https://www.proyecto4patas.org/wp-content/uploads/photo-gallery/thumb/pedro-feliz.jpg?bwg=1686019807',
      name: 'Pedro',
      description: '5 años de edad. Castrado y vacunado. Super compañero',
    },
    {
      img: 'https://www.proyecto4patas.org/wp-content/uploads/photo-gallery/imported_from_media_libray/Gaston2.jpg?bwg=1682897562',
      name: 'Gastón',
      description: 'Rescatado en la calle con sarna y heridas en la piel. Está recuperado, castrado y vacunado. Es tamaño mediano, tranquilo y amigable',
    },
    {
      img: 'https://www.proyecto4patas.org/wp-content/uploads/photo-gallery/imported_from_media_libray/Manchita5.jpg?bwg=1682889279',
      name: 'Manchita',
      description: '3 años. Le falta una patita pero le sobra amor. Se lleva bien con otros perros',
    },
    {
      img: 'https://www.proyecto4patas.org/wp-content/uploads/photo-gallery/Elsa_y_Frodo.jpg?bwg=1598318242',
      name: 'Elsa y Frodo',
      description: 'Elsa y Frodo son madre e hijo. Ella es una abuela de 10 años de edad y él un adulto de 4 años',
    },
    {
      img: 'https://www.proyecto4patas.org/wp-content/uploads/photo-gallery/imported_from_media_libray/Flopy9.jpg?bwg=1691975409',
      name: 'Flopy',
      description: '1 año. Se lleva muy bien con otros perros',
    },
  ];

  const cardStyle = {
    margin: '10px', // Ajusta el valor de acuerdo a la separación deseada
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Adopción</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cardData.map((card, index) => (
          <div key={index} style={cardStyle}>
            <Card
              img={card.img}
              name={card.name}
              description={card.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
