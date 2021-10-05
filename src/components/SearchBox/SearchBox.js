import React from 'react';
import PropTypes from 'prop-types';

export const SearchBox = ({ keywordInfo, transcriptArray }) => {

  if (keywordInfo.length <= 0){
    return (
      <div>
      </div>
    );
  }else if(keywordInfo.length > 0){
    var searchresult = ``;
    return (
      <div className="transcript-box">
        {keywordInfo.map((keyword, keywordIndex) => {
          var fulltext = ``
          transcriptArray.forEach(function(transcriptItem, overallIndex) {
            const { speaker, text } = transcriptItem;
            fulltext = fulltext + text
          });
          if (fulltext.includes(keyword)) {
            var elementsindex = fulltext.indexOf(keyword);
            while(elementsindex  !== -1){
              searchresult = searchresult + `target: ${keyword}, index: ${fulltext.indexOf(keyword)} text: ${fulltext.substring(elementsindex-5, elementsindex+6)}\n`;
              elementsindex = fulltext.indexOf(keyword,elementsindex + 1);
            }
            return (
              <div>
                <span>{`${fulltext}`}</span>
              </div>
            );
          }
        })}
      </div>
    );
  };
};

SearchBox.propTypes = {
  keywordInfo: PropTypes.arrayOf(PropTypes.object),
  transcriptArray: PropTypes.arrayOf(PropTypes.object),
};

SearchBox.defaultProps = {
  keywordInfo: [],
  transcriptArray: [],
};

export default SearchBox;
