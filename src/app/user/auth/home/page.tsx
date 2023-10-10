import Image from 'next/image';
import React from 'react';
import 'react-dom';

export default function UserMapPage() {
  return (
    <div
      style={{
        width: 1440,
        height: 1024,
        position: 'relative',
        background: 'white',
      }}
    >
      <h1>¡Hola Marta!</h1>
      <h2>
        Éstas son las ONGs cerca tuyo que alojan mascotas que buscan hogar.
      </h2>
      <Image
        alt="somthing"
        style={{
          left: 792 / 2,
          top: 198,
          position: 'absolute',
          border: '0.50px black solid',
        }}
        src="https://via.placeholder.com/505x556"
        height={505}
        width={556}
        priority
      />
      <div
        style={{
          width: 422,
          height: 126,
          left: 792 / 2,
          top: 800,
          position: 'absolute',
          background: '#B3261E',
          borderRadius: 100,
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            alignSelf: 'stretch',
            flex: '1 1 0',
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 10,
            paddingBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            display: 'inline-flex',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 22,
              fontFamily: 'Roboto',
              fontWeight: '400',
              lineHeight: 28,
              wordWrap: 'break-word',
            }}
          >
            Reportar una mascota perdida
          </div>
        </div>
      </div>
      <div>
        <a href="./rescue">
          <button>Reportar una mascota perdida</button>
        </a>
      </div>
    </div>
  );
}
