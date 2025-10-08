import React, { useEffect, useState } from 'react';
import { Space, Image, Typography } from 'tdesign-react';
import { useLinkClickHandler } from 'react-router-dom';

export default () => {
  const [album, setAlbum] = useState<Array<any>>([]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useEffect(async () => {
    const res = await fetch('https://1251590861-3vml8627u8.ap-shanghai.tencentscf.com/images');
    const images = await res.json();
    setAlbum(images);
  }, []);

  return (
    <div className="pages-album">
      <Space breakLine size={24} style={{ justifyContent: 'center' }}>
        {album.map((i) => (
          <Space direction="vertical" key={i.Preview} align="center" style={{ cursor: 'pointer' }}>
            <Image
              src={i.Preview}
              style={{ width: 160, height: 160 }}
              fit="contain"
              onClick={() => useLinkClickHandler('/album/')}
            />
            <Typography.Text>{i.name}</Typography.Text>
          </Space>
        ))}
      </Space>
    </div>
  );
};
