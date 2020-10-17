import express from 'express';
import request from 'request';
import { IDs } from '../lib/id';

export type Result = {
  status: 'success';
  data: number
} | {
  status: 'error';
  msg: string
}

type Platform = 'bilibili'|'douyin'|'youtube'|'weibo'|'weixin'

const platforms: Platform[] = ['bilibili']

export function getFollowers(app: ReturnType<typeof express>) {
  app.get('/api/followers', async (req, res) => {
    const platform = req.query?.platform as Platform
    if (!platform) {
      res.json({
        status: 'error',
        msg: '请指定平台'
      })
      return;
    }

    if (!platforms.includes(platform)) {
      res.json({
        status: 'error',
        msg: '暂无此平台'
      })
      return;
    }

    switch (platform) {
      case 'bilibili': {
        const result = await getBiliBiliFollowers();
        res.json({
          status: 'success',
          data: result
        });
      }
    }
  });
}

function getBiliBiliFollowers() {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.bilibili.com/x/relation/stat?vmid=${IDs.bilibili}&jsonp=jsonp`,
      method: 'GET',
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    }, (error, response, body) => {
      if (error) {
        reject(error)
      } else {
        resolve(JSON.parse(body)?.data?.follower)
      }
    })
  })
}

function getWeiboFollowers() {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.weibo.com/2/users/show.json?access_token=2.00gSRiBI1sAS3B294f45e0ea0LRcvX&uid=${IDs.weibo}`,
      method: 'GET',
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    }, (error, response, body) => {
      if (error) {
        reject(error)
      } else {
        resolve(JSON.parse(body)?.data?.follower)
      }
    })
  })
}