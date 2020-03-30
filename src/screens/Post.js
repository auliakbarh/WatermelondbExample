import React, {Component} from 'react';
import {Text} from 'react-native';
import {FlatList} from 'react-navigation';
import withObservables from '@nozbe/with-observables';

import Comment from '../components/Comment';
import styles from '../styles/styles';
import prompt from '../components/prompt';
import Button from '../components/Button';
import {extractId} from '../utils/utils';

const renderComment = ({item}) => <Comment comment={item} key={item.id} />;

class Post extends Component {
  addComment = async () => {
    const comment = await prompt('Write a comment');
    await this.props.post.addComment(comment);
  };

  render() {
    const {post, comments} = this.props;
    return (
      <FlatList
        style={styles.marginContainer}
        data={comments}
        renderItem={renderComment}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.subtitle}>{post.subtitle}</Text>
            <Text style={styles.body}>{post.body}</Text>
            <Text style={styles.subtitle}>Comments ({comments.length})</Text>
          </>
        )}
        ListFooterComponent={() => (
          <Button
            style={styles.button}
            title="Add comment"
            onPress={this.addComment}
          />
        )}
        keyExtractor={extractId}
      />
    );
  }
}

const enhance = withObservables(['post'], ({post}) => ({
  post: post.observe(),
  comments: post.comments.observe(),
}));

export default enhance(Post);
