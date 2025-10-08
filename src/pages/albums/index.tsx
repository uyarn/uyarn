import React, { useEffect, useState } from 'react';
import { Space, Image, Typography } from 'tdesign-react';
import { useNavigate } from 'react-router-dom';

export default () => {
  const [album, setAlbum] = useState<Array<any>>([]);
  const navigate = useNavigate();

  function handleClick(link: string) {
    navigate(link);
  }
  useEffect(() => {
    const getAlbums = async () => {
      const res = await fetch('https://1251590861-3vml8627u8.ap-shanghai.tencentscf.com/images');
      const images = await res.json();
      setAlbum(images || []);
    };
    getAlbums();
  }, []);

  return (
    <div className="pages-album">
      <Space breakLine size={24} style={{ justifyContent: 'center' }}>
        {album?.map?.((i) => (
          <Space direction="vertical" key={i.Preview} align="center" style={{ cursor: 'pointer' }}>
            <Image
              src={i.Preview}
              style={{ width: 240, height: 240 }}
              fit="contain"
              onClick={() => handleClick(`/albums/${i.name}`)}
            />
            <Typography.Text>{i.name}</Typography.Text>
          </Space>
        ))}
      </Space>
    </div>
  );
};
