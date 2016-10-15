#!/usr/bin/ruby

File.open('text.txt').each_line do |li|
  temp = li.scan(/^(\d{10})/)
  puts temp
end
