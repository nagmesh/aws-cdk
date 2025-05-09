import { Metric, Stats } from '../../aws-cloudwatch';
import * as cloudwatch from '../lib';

it.each([
  Stats.percentileRank(0),
  Stats.percentileRank(0, 1),
  Stats.percentileRank(0, undefined),
])('Stats can create valid statistics %s without causing warnings', (statistic) => {
  const metric = new Metric({
    namespace: 'example',
    metricName: 'example',
    statistic,
  });

  expect(metric.warningsV2).toEqual(undefined);
});

test('spot check some constants', () => {
  expect(cloudwatch.Stats.AVERAGE).toEqual('Average');
  expect(cloudwatch.Stats.IQM).toEqual('IQM');
  expect(cloudwatch.Stats.SAMPLE_COUNT).toEqual('SampleCount');
});

test('spot check percentiles', () => {
  expect(cloudwatch.Stats.p(99)).toEqual('p99');
  expect(cloudwatch.Stats.p(99.9)).toEqual('p99.9');
  expect(cloudwatch.Stats.p(99.99)).toEqual('p99.99');
});

test('spot check some trimmed means', () => {
  expect(cloudwatch.Stats.tm(99)).toEqual('tm99');
  expect(cloudwatch.Stats.tm(99.9)).toEqual('tm99.9');
  expect(cloudwatch.Stats.tm(0.01, 99.99)).toEqual('TM(0.01%:99.99%)');
});

test('percentile rank', () => {
  expect(cloudwatch.Stats.pr(300)).toEqual('PR(:300)');
  expect(cloudwatch.Stats.pr(100, 500)).toEqual('PR(100:500)');
});
