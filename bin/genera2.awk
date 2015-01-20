BEGIN{
  i = 1;
  while((getline < cols) > 0){
    idx_col[i++] = $1;
  }
  max_col = i - 1;

  i = 1;
  while((getline < rows) > 0){
    idx_row[i++] = $1;
  }
  max_row = i - 1;
}
{
#  heat[$1"_"$2]++;
  heat[$(NF-3)"_"$(NF-5)]++;
}
END{
  for(z in heat) {
    if(heat[z] > max_heat) {
      max_heat = heat[z];
    }
  }
  printf "row,col,score,ip,user\n";
  for(r = 1; r <= max_row; r++){
    for(c = 1; c <= max_col; c++){
      printf "%s,%s,%s,%s,%s\n", c, r, heat[idx_col[c]"_"idx_row[r]] + 0, idx_col[c], idx_row[r];
    }
  }
}
