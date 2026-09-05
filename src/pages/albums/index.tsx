import React, { useContext, useEffect, useState } from 'react';
import { Space, Image, Typography } from 'tdesign-react';
import { useNavigate } from 'react-router-dom';
import RootContext from '@/layouts/rootContext';

export default () => {
  const [album, setAlbum] = useState<Array<any>>([]);
  const [hasError, setHasError] = useState(false);
  const { currentLang } = useContext(RootContext);
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
        setAlbum(
          Array.isArray(images)
            ? images.filter((albumItem) => albumItem.name?.toLowerCase() !== 'travel')
            : [],
        );
      } catch {
        setAlbum([]);
        setHasError(true);
      }
    };
    getAlbums();
  }, []);

  return (
    <div className="pages-album">
      {hasError && <Typography.Text theme="error">{currentLang.albums.loadError}</Typography.Text>}
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
