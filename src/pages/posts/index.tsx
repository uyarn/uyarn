import React from 'react';
import { Card, Image, Loading, Tag } from 'tdesign-react';
import { useLinkClickHandler } from 'react-router-dom';

import queryPostList from '@/requests/query-post-list';
import Style from './index.module.css';

export default () => {
  const { data: postList } = queryPostList();
  return (
    <div className={Style.pagePosts}>
      {postList.map((post: Record<string, any>, index: number) => (
        <Card
          key={index}
          bordered={false}
          theme="poster2"
          style={{ width: '320px' }}
          cover={
            <Image
              src={post.cover?.file?.url}
              style={{ width: '320px', height: '180px' }}
              lazy
              loading={
                <Loading
                  delay={0}
                  indicator
                  inheritColor={false}
                  loading
                  preventScrollThrough
                  showOverlay
                  size="small"
                />
              }
              key={index}
            />
          }
        >
          <div style={{ textAlign: 'left' }}>
            {post.properties?.Tags.multi_select.map((tag: { name: string; color: string }, idx: number) => (
              <Tag
                key={idx}
                style={{
                  backgroundColor: tag.color,
                  margin: '0 var(--td-comp-margin-xs)',
                  color: 'var(--td-text-color-primary)',
                }}
              >
                {tag.name}
              </Tag>
            ))}

            <h3>{post.properties?.Name?.title[0]?.plain_text}</h3>
            <p>{post.properties?.PostDate?.date?.start}</p>
            <div
              style={{ textAlign: 'right', cursor: 'pointer' }}
              onClick={useLinkClickHandler(`/posts/${post.id.replace(/-/g, '')}`)}
            >
              View Detail
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
