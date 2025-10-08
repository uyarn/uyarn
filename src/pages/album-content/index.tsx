import React, { useMemo, useState, useEffect } from 'react';
import { ImageViewer, Image, Space, Typography, Breadcrumb } from 'tdesign-react';
import { BrowseIcon } from 'tdesign-icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { ImageViewerProps } from 'tdesign-react';

export default () => {
  const { pathname } = useLocation();
  const [albumType, setAlbumType] = useState('');
  const albumName: string = useMemo(() => pathname.split('/').pop(), [pathname]) || '';
  const [images, setImages] = useState<Array<any>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAlbums = async () => {
      const res = await fetch('https://1251590861-3vml8627u8.ap-shanghai.tencentscf.com/images');
      const albums = await res.json();
      const currentAlbum = albums.find((album: any) => album.name.toLowerCase() === albumName.toLowerCase());
      const imgs = currentAlbum.children.map((v: any) => (v.type === 'file' ? v.originPath : v));
      setAlbumType(currentAlbum.children[0].type);
      setImages(imgs);
    };
    getAlbums();
  }, []);

  if (!images) return null;
  return (
    <Space direction="vertical" style={{ alignItems: 'center' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.BreadcrumbItem onClick={() => navigate('/albums')}>Albums</Breadcrumb.BreadcrumbItem>
        <Breadcrumb.BreadcrumbItem>{albumName}</Breadcrumb.BreadcrumbItem>
      </Breadcrumb>
      {albumType === 'file' ? (
        <Space breakLine size={16} style={{ justifyContent: 'center' }}>
          {images.map((imgSrc, index) => {
            const trigger: ImageViewerProps['trigger'] = ({ open }) => {
              const mask = (
                <div
                  style={{
                    background: 'rgba(0,0,0,.6)',
                    color: '#fff',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => open(index)}
                >
                  <span>
                    <BrowseIcon size="16px" name={'browse'} />
                  </span>
                </div>
              );

              return (
                <Image
                  src={imgSrc}
                  overlayContent={mask}
                  overlayTrigger="hover"
                  fit="contain"
                  style={{
                    width: 240,
                    height: 240,
                    border: '4px solid var(--td-bg-color-secondarycontainer)',
                    borderRadius: 'var(--td-radius-medium)',
                    backgroundColor: '#fff',
                  }}
                />
              );
            };

            return <ImageViewer key={index} trigger={trigger} images={images} zIndex={10000} />;
          })}
        </Space>
      ) : (
        <Space breakLine size={16} style={{ justifyContent: 'center' }}>
          {images.map((i, index) => {
            const trigger: ImageViewerProps['trigger'] = ({ open }) => {
              const mask = (
                <div
                  style={{
                    background: 'rgba(0,0,0,.6)',
                    color: '#fff',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => open()}
                >
                  <span>
                    <BrowseIcon size="16px" name={'browse'} />
                  </span>
                </div>
              );

              return (
                <Space direction="vertical" key={i.Preview} align="center">
                  <Image
                    alt={'test'}
                    src={i.Preview}
                    overlayContent={mask}
                    overlayTrigger="hover"
                    fit="contain"
                    style={{
                      width: 240,
                      height: 240,
                      border: '4px solid var(--td-bg-color-secondarycontainer)',
                      borderRadius: 'var(--td-radius-medium)',
                      backgroundColor: '#fff',
                    }}
                  />
                  <Typography.Text>{i.name}</Typography.Text>
                </Space>
              );
            };
            return (
              <ImageViewer key={index} trigger={trigger} images={i.children.map((v) => v.originPath)} zIndex={10000} />
            );
          })}
        </Space>
      )}
    </Space>
  );
};
