require 'middleman-gh-pages'
require 'rake/clean'

task :default => [:build]

rule ".png" => ".msc" do |t|
    `mscgen -T png -o #{t.name} -i #{t.source}`
end

MSC = FileList["source/*/*.msc"]
PNG = MSC.ext(".png")

task :build => PNG

CLEAN.include PNG
