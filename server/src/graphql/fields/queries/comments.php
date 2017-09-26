<?php

require_once __DIR__ . '/../../../../vendor/autoload.php';
require_once(__DIR__ . '/../../types/comment.php');


use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\AbstractField;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\IdType;
use Youshido\GraphQL\Type\ListType\ListType;


class CommentsField extends AbstractField {

    public function build(FieldConfig $config) {

        $config->addArguments([
            'id' => new IdType(),
            'authorid' => new IdType(),
            'artId' => new IdType()
        ]);
    }

    public function getType() {
        return new ListType(new CommentType());
    }

    public function resolve($root, array $args, ResolveInfo $info) {

        $sanitized = filter_var($args, FILTER_SANITIZE_STRING);

        $where = Db::setPlaceholders($args);

        return Db::query("SELECT id, art_id AS artId, authorid AS authorId, content, created AS dateCreated
          FROM comments
          WHERE {$where}", $args)->fetchAll(PDO::FETCH_ASSOC);
    }
}

?>