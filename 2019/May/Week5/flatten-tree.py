#!/usr/bin/env python3

# 使用空间换取O(n)的时间复杂度
# 所有children都将为数组, 即使是空数组
def flatten_tree(arr):
  result = {}
  for line in arr:
    if line['pid'] in result:
      result[line['pid']].append(line)
    else:
      result[line['pid']] = [line]
    if line['id'] in result:
      line['children'] = result[line['id']]
    else:
      line['children'] = []
      result[line['id']] = line['children']
  return result[0]


def main():
  r = flatten_tree([
    {'pid': 1, 'id': 5},
    {'pid': 0, 'id': 1},
    {'pid': 2, 'id': 6},
    {'pid': 0, 'id': 2},
    {'pid': 1, 'id': 4}
  ])
  import json
  print(json.dumps(r, indent=2))


if __name__ == '__main__':
  main()
