import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Rss, RssReject } from './rss.entity';
import { RssRegisterDto } from './dto/rss-register.dto';

@Injectable()
export class RssRepository extends Repository<Rss> {
  constructor(private dataSource: DataSource) {
    super(Rss, dataSource.createEntityManager());
  }

  async insertNewRss(rssRegisterDto: RssRegisterDto) {
    const { blog, name, email, rssUrl } = rssRegisterDto;
    const rssObj = this.create({
      name: blog,
      userName: name,
      email,
      rssUrl,
    });
    await this.save(rssObj);
  }
}

@Injectable()
export class RssRejectRepository extends Repository<RssReject> {
  constructor(private dataSource: DataSource) {
    super(RssReject, dataSource.createEntityManager());
  }
}
