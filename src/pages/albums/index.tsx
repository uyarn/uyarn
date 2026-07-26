import React, { useEffect, useState } from 'react';
import { Space, Image, Typography } from 'tdesign-react';
import { useNavigate } from 'react-router-dom';

export default () => {
  const [album, setAlbum] = useState<Array<any>>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleClick(link: string) {
    navigate(link);
  }
  useEffect(() => {
    const getAlbums = async () => {
      try {
        const res = await fetch('https://1251590861-3vml8627u8.ap-shanghai.tencentscf.com/images');
        if (!res.ok) {
          throw new Error(`Failed to fetch albums: ${res.status}`);
        }

        const images = await res.json();
        setAlbum(Array.isArray(images) ? images : []);
      } catch {
        setAlbum([]);
        setError('相册加载失败，请稍后重试');
      }
    };
    getAlbums();
  }, []);

  return (
    <div className="pages-album">
      {error && <Typography.Text theme="danger">{error}</Typography.Text>}
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
